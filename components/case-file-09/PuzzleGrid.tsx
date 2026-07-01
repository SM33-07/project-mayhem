import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { PuzzleTile } from "./PuzzleTile";
import { SortableItem } from "./types";

interface PuzzleGridProps {
  items: SortableItem[];
  onDragEnd: (event: DragEndEvent) => void;
  gridCols: number;
}

export function PuzzleGrid({ items, onDragEnd, gridCols }: PuzzleGridProps) {
  // Use PointerSensor and KeyboardSensor for accessibility and smooth mouse/touch controls
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4, // Prevents accidental dragging when clicking
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Set up responsive grid columns. If cols is 4, we use md:grid-cols-4 and cols-2 on mobile.
  const gridColsClass =
    gridCols === 4 ? "grid-cols-2 md:grid-cols-4" : `grid-cols-${gridCols}`;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div
          className={`grid ${gridColsClass} gap-0 p-0 w-full max-w-4xl mx-auto bg-zinc-950/45 border border-zinc-800/80 rounded-2xl shadow-2xl backdrop-blur-md relative overflow-hidden`}
        >
          {/* Subtle grid background scanlines / matrix grid overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-500/[0.01] pointer-events-none rounded-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none rounded-2xl" />

          {items.map((item) => (
            <PuzzleTile key={item.id} id={item.id} url={item.url} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
