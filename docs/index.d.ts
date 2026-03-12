import { GRi4DGroupType, GRi4DGroupHeaderProps, GRi4DItemsRowProps, GRi4DViewportOptions } from "@gri4d/griiiid";
interface ReactGRi4DProps<TItem = any, TData = any> {
    groups: GRi4DGroupType<TItem, TData>[];
    spacing: number;
    stickyTop?: number;
    itemsRow: GRi4DItemsRowProps;
    groupHeader?: GRi4DGroupHeaderProps;
    viewport?: GRi4DViewportOptions | HTMLElement;
}
export default function ReactGRi4D<TItem = any, TData = any>(props: ReactGRi4DProps<TItem, TData>): import("react/jsx-runtime").JSX.Element;
export {};
