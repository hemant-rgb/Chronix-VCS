import React, { useState } from "react";

export default function FileTree({
    nodes,
    onFileClick,
    currentPath = "",
}) {
    return (
        <div>
            {nodes.map((node, index) => (
                <TreeNode
                    key={index}
                    node={node}
                    onFileClick={onFileClick}
                    currentPath={currentPath}
                />
            ))}
        </div>
    );
}

function TreeNode({
    node,
    onFileClick,
    currentPath,
}) {

    const [open, setOpen] =
        useState(false);

    const nodePath =
        currentPath
            ? `${currentPath}/${node.name}`
            : node.name;

    // FILE
    if (node.type === "file") {

        return (
            <div
                style={{
                    paddingLeft: "20px",
                    cursor: "pointer",
                }}
                onClick={() =>
                    onFileClick?.(
                        nodePath
                    )
                }
            >
                📄 {node.name}
            </div>
        );
    }

    // FOLDER
    return (
        <div>

            <div
                style={{
                    paddingLeft: "20px",
                    cursor: "pointer",
                    userSelect: "none",
                }}
                onClick={() =>
                    setOpen(!open)
                }
            >
                {open
                    ? "📂"
                    : "📁"}{" "}
                {node.name}
            </div>

            {open &&
                node.children && (
                    <div
                        style={{
                            marginLeft:
                                "20px",
                        }}
                    >
                        <FileTree
                            nodes={
                                node.children
                            }
                            onFileClick={
                                onFileClick
                            }
                            currentPath={
                                nodePath
                            }
                        />
                    </div>
                )}
        </div>
    );
}