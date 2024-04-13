import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
import sys
import json

# Define Box class
class Box:
    def __init__(self, id, dimensions, weight, max_weight_on_top, stackable=True):
        self.id = id
        self.dimensions = dimensions
        self.weight = weight
        self.max_weight_on_top = max_weight_on_top
        self.stackable = stackable

# Define Container class
class Container:
    def __init__(self, dimensions, max_weight):
        self.dimensions = dimensions
        self.occupied_space = np.zeros(dimensions, dtype=int)
        self.current_weight = 0
        self.max_weight = max_weight

# Function to check if a box can fit in a given position in the container
def can_fit_box(container, box, x, y, z):
    if (
        x + box.dimensions[0] > container.dimensions[0]
        or y + box.dimensions[1] > container.dimensions[1]
        or z + box.dimensions[2] > container.dimensions[2]
    ):
        return False

    if np.any(container.occupied_space[x:x+box.dimensions[0], y:y+box.dimensions[1], z:z+box.dimensions[2]] != 0):
        return False

    if container.current_weight + box.weight > container.max_weight:
        return False

    if not box.stackable:
        # Mark the entire z-dimension as occupied
        container.occupied_space[x:x+box.dimensions[0], y:y+box.dimensions[1], :] = box.id
        container.current_weight += box.weight
        return True

    # Check weight constraint for stacked boxes
    if z > 0:
        stacked_boxes_weight = np.sum(
            [boxes[b - 1].weight for b in container.occupied_space[x:x+box.dimensions[0], y:y+box.dimensions[1], z-1].ravel() if b != 0]
        )
        if stacked_boxes_weight + box.weight > box.max_weight_on_top:
            return False

    container.current_weight += box.weight
    return True

# Function to pack boxes into the container
def pack_boxes(boxes, container_dimensions, max_container_weight):
    # Sort boxes by volume (largest first)
    boxes.sort(key=lambda box: np.prod(box.dimensions), reverse=True)

    container = Container(container_dimensions, max_container_weight)
    packed_boxes = []
    box_numbers_not_fit = []

    for box in boxes:
        fitted = False
        for x in range(container.dimensions[0] - box.dimensions[0] + 1):
            for y in range(container.dimensions[1] - box.dimensions[1] + 1):
                for z in range(container.dimensions[2] - box.dimensions[2] + 1):
                    if can_fit_box(container, box, x, y, z):
                        container.occupied_space[x:x+box.dimensions[0], y:y+box.dimensions[1], z:z+box.dimensions[2]] = box.id
                        packed_boxes.append((box.id, (x, y, z)))
                        fitted = True
                        break
                if fitted:
                    break
            if fitted:
                break
        if not fitted:
            box_numbers_not_fit.append(box.id)

    return packed_boxes, box_numbers_not_fit

# Function to visualize the packed boxes
def visualize_packed_boxes(boxes, container_dimensions, packed_boxes):
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

    # Create a colormap
    colors = cm.rainbow(np.linspace(0, 1, len(packed_boxes)))

    for i, (box_id, (x, y, z)) in enumerate(packed_boxes):
        box = next(box for box in boxes if box.id == box_id)
        ax.bar3d(x, y, z, box.dimensions[0], box.dimensions[1], box.dimensions[2], color=colors[i], alpha=0.8)

    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_xlim(0, container_dimensions[0])
    ax.set_ylim(0, container_dimensions[1])
    ax.set_zlim(0, container_dimensions[2])

    plt.show()

if __name__ == "__main__":
    # Get data from Node.js server
    data = json.loads(sys.argv[1])

    # Convert data to DataFrame
    df = pd.DataFrame(data)

    # Convert DataFrame to list of Box objects
    boxes = []
    for index, row in df.iterrows():
        box = Box(row['Cargo number'], (row['Length'], row['Width'], row['Height']),
                  row['Weight'], row['Weight'],
                  row['Allow cargo stacking ON TOP'] and row['Allow cargo stacking UNDER'])
        boxes.append(box)

    # Define container dimensions and maximum weight
    container_dimensions = (10, 10, 10)
    max_container_weight = 400

    # Pack boxes into the container
    packed_boxes, box_numbers_not_fit = pack_boxes(boxes, container_dimensions, max_container_weight)

    # Display results
    print("Boxes not fit:", box_numbers_not_fit)
    visualize_packed_boxes(boxes, container_dimensions, packed_boxes)
