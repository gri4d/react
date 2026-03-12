import React, { useRef, useEffect } from "react";
import GRi4D, {
  GRi4DGroupType,
  GRi4DGroupHeaderProps,
  GRi4DItemsRowProps,
  GRi4DViewportOptions,
} from "@gri4d/griiiid";

interface ReactGRi4DProps<TItem = any, TData = any> {
  groups: GRi4DGroupType<TItem, TData>[];
  spacing: number;
  stickyTop?: number;
  itemsRow: GRi4DItemsRowProps;
  groupHeader?: GRi4DGroupHeaderProps;
  viewport?: GRi4DViewportOptions | HTMLElement;
}

export default function ReactGRi4D<TItem = any, TData = any>(
  props: ReactGRi4DProps<TItem, TData>
) {
  const mountPointRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<GRi4D<TItem, TData> | null>(null);

  useEffect(() => {
    if (!mountPointRef.current) return;

    const mountPoint =
      props.viewport instanceof HTMLElement
        ? props.viewport
        : mountPointRef.current;

    // Initialize VirtualGrid
    gridRef.current = new GRi4D({
      ...props,
      mountPoint,
    });

    return () => {
      // Clean up on unmount
      gridRef.current?.destroy();
      gridRef.current = null;
    };
  }, []); // only once on mount

  // Update grid when props change
  useEffect(() => {
    if (gridRef.current) {
      const options = { ...props };

      if (!mountPointRef.current) {
        return;
      }

      const mountPoint =
        props.viewport instanceof HTMLElement
          ? props.viewport
          : mountPointRef.current;

      gridRef.current.reset({
        ...options,
        mountPoint,
      });
    }
  }, [props]);

  return <div className="ReactGRi4D" ref={mountPointRef} />;
}
