import React from "react";
import { createRoot } from "react-dom/client";
import ReactGRi4D from "../src/index.tsx";

function App() {
  const [itemsPerGroup, setItemsPerGroup] = React.useState(100);
  const [numGroups, setNumGroups] = React.useState(100);
  const [numCols, setNumCols] = React.useState(5);
  const [spacing, setSpacing] = React.useState(5);
  const [rowHeight, setRowHeight] = React.useState(200);
  const [groupHeaderHeight, setGroupHeaderHeight] = React.useState(50);
  const [stickyTop, setStickyTop] = React.useState(100);
  const [showGroupHeader, setShowGroupHeader] = React.useState(true);
  const [viewport, setViewport] = React.useState("window");

  const totalItems = numGroups * itemsPerGroup;

  const elementViewportTestRef = React.useRef(null);

  const groups = React.useMemo(() => {
    return Array.from({ length: numGroups }).map((_, groupIndex) => ({
      title: `Group ${groupIndex + 1}`,
      items: Array.from({ length: itemsPerGroup }).map((_, itemIndex) => ({
        title: `Item ${groupIndex * itemsPerGroup + itemIndex + 1}`,
      })),
    }));
  }, [itemsPerGroup, numGroups]);

  const itemsRow = React.useMemo(() => {
    return {
      height: rowHeight,
      columns: numCols,
      renderer: (item) => {
        const el = document.createElement("div");
        el.textContent = item.title;
        el.style.border = "1px solid #999";
        el.style.background = "lightblue";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.flex = "1";
        el.style.height = "100%";
        return el;
      },
    };
  }, [numCols, rowHeight]);

  const groupHeader = React.useMemo(() => {
    if (!showGroupHeader) {
      return null;
    }

    return {
      height: groupHeaderHeight,
      renderer: (group) => {
        const el = document.createElement("div");
        el.textContent = group.title;
        el.style.background = "#eee";
        el.style.fontWeight = "bold";
        el.style.padding = "5px 10px";
        el.style.height = "100%";
        el.style.boxSizing = "border-box";
        return el;
      },
    };
  }, [groupHeaderHeight, showGroupHeader]);

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          fontWeight: 500,
          fontSize: 32,
          position: "fixed",
          height: 100,
          top: 0,
          background: "limegreen",
          zIndex: 2,
          padding: 20,
          boxSizing: "border-box",
        }}
      >
        <div>
          GRiiiiD Demo - {totalItems} items, {numGroups} groups
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          <label>itemsPerGroup:</label>
          <input
            type="number"
            value={itemsPerGroup}
            onChange={(e) => setItemsPerGroup(+e.target.value)}
            min={1}
            style={{ width: 50 }}
          />

          <label>numGroups:</label>
          <input
            type="number"
            value={numGroups}
            onChange={(e) => setNumGroups(+e.target.value)}
            min={1}
            style={{ width: 50 }}
          />

          <label>numCols:</label>
          <input
            type="number"
            value={numCols}
            onChange={(e) => setNumCols(+e.target.value)}
            min={1}
            style={{ width: 50 }}
          />
          <label>spacing:</label>
          <input
            type="number"
            value={spacing}
            onChange={(e) => setSpacing(+e.target.value)}
            min={0}
            style={{ width: 50 }}
          />
          <label>rowHeight:</label>
          <input
            type="number"
            value={rowHeight}
            onChange={(e) => setRowHeight(+e.target.value)}
            min={0}
            style={{ width: 50 }}
          />
          <label>groupHeaderHeight:</label>
          <input
            type="number"
            value={groupHeaderHeight}
            onChange={(e) => setGroupHeaderHeight(+e.target.value)}
            min={0}
            style={{ width: 50 }}
          />

          <label>stickyTop:</label>
          <input
            type="number"
            value={stickyTop}
            onChange={(e) => setStickyTop(+e.target.value)}
            min={0}
            style={{ width: 50 }}
          />

          <label
            for="showGroupHeader"
            style={{
              userSelect: "none",
            }}
          >
            showGroupHeader:
          </label>
          <input
            id="showGroupHeader"
            type="checkbox"
            checked={showGroupHeader}
            onChange={() => setShowGroupHeader(!showGroupHeader)}
          />

          <label>viewport:</label>
          <select
            name="viewport"
            id="viewport-select"
            onChange={(e) => setViewport(e.target.value)}
          >
            <option value="window">window</option>
            <option value="element">element</option>
            <option value="options">options [600x600]</option>
          </select>
        </div>
      </header>

      <div
        ref={elementViewportTestRef}
        style={{
          height: 200,
          background: "red",
          overflow: "auto",
          position: "relative",
          marginTop: 100,
        }}
      >
        {viewport === "element"
          ? ""
          : "this block will be used for element viewport demo and will scroll off screen if viewport is window"}
      </div>

      <div style={{ marginBottom: 100 }}>
        <ReactGRi4D
          groups={groups}
          spacing={spacing}
          stickyTop={stickyTop}
          itemsRow={itemsRow}
          groupHeader={groupHeader}
          viewport={
            viewport === "options"
              ? {
                  width: 600,
                  height: 600,
                }
              : viewport === "element"
                ? elementViewportTestRef.current
                : null
          }
        />
      </div>

      <footer
        style={{
          position: "fixed",
          background: "orange",
          bottom: 0,
          height: 100,
          width: "100%",
        }}
      >
        footer
      </footer>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
