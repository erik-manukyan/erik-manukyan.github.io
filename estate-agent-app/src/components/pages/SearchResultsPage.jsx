import Gallery from "../properties/Gallery";
import Favourites from "../favourites/Favourites";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  pointerWithin,
} from "@dnd-kit/core";
import { snapCenterToCursor, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useFavourites } from "../../hooks/useFavourites";
import { useState } from "react";
import ImageCard from "../properties/ImageCard";
import SearchFiltersForm from "../search/SearchFiltersForm";

export default function SearchResultsPage() {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const [activeProperty, setActiveProperty] = useState(null);

  function handleDragStart(event) {
    setActiveProperty(event.active.data.current.property);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { property, isMini } = active.data.current;

    // Dragging FROM gallery TO favourites → Add
    if (over?.id === "favourites" && !isMini) {
      if (!isFavourite(property.id)) {
        addFavourite(property);
      }
    }

    // Dragging FROM favourites TO outside → Remove
    if (isMini && over?.id !== "favourites") {
      removeFavourite(property.id);
    }

    setActiveProperty(null);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200, // 2 seconds
        tolerance: 5, // Allow 5px movement during delay (prevents accidental cancellation)
      },
    })
  );

  return (
    <>
      {/* MiniSearch - centered via Bootstrap */}
      <div className="d-flex justify-content-center py-3">
        <SearchFiltersForm variant="mini" />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Main Content - Gallery Left, Cart & Favourites Right */}
        <div className="container-fluid">
          <div className="row">
            {/* Left Side - Gallery */}
            <div className="col-md-8">
              <Gallery />
            </div>
            <div className="col-md-4">
              <Favourites />
            </div>
          </div>
        </div>
        <DragOverlay modifiers={[snapCenterToCursor, restrictToWindowEdges]}>
          {activeProperty ? (
            <div style={{ width: "250px" }}>
              <ImageCard property={activeProperty} isMini={true} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
}
