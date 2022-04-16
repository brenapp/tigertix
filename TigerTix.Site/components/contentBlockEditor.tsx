import {
    ContentBlock,
    Editor,
    EditorState,
    getDefaultKeyBinding,
    RichUtils,
    EditorProps,
} from "draft-js";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import Button from "./button";

function getBlockStyle(block: ContentBlock) {
    switch (block.getType()) {
        case "header-one":
            return "text-2xl text-orange";
        case "header-two":
            return "text-2xl italic";
        case "header-three":
            return "text-2xl";
        case "header-four":
            return "text-xl";
        case "header-five":
            return "text-lg";
        case "header-six":
            return "text-md";
        case "blockquote":
            return "border-l-2 p-2 border-gray-500 bg-gray-200";
        default:
            return "";
    }
}

const ContentBlockEditor: React.FC<
    {
        state: EditorState;
        setState: Dispatch<SetStateAction<EditorState>>;
    } & Partial<EditorProps>
> = ({ state: editorState, setState: setEditorState, ...props }) => {
    const editor = useRef<Editor>(null);
    const [focused, setFocused] = useState(false);

    function handleKeyCommand<A, B>(command: string, editorState: EditorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    }

    const mapKeyToEditorCommand = useCallback(
        (e) => {
            switch (e.keyCode) {
                case 9: // TAB
                    const newEditorState = RichUtils.onTab(
                        e,
                        editorState,
                        4 /* maxDepth */
                    );
                    if (newEditorState !== editorState) {
                        setEditorState(newEditorState);
                    }
                    return null;
            }
            return getDefaultKeyBinding(e);
        },
        [editorState, setEditorState]
    );

    const EditorButton: React.FC<{
        selected: boolean;
        onSelect: () => void;
        className?: string;
    }> = ({ children, selected, onSelect, className }) => {
        return (
            <Button
                onMouseDown={(e) => {
                    e.preventDefault();
                    onSelect();
                }}
                className={
                    `font-serif px-2 border-2 mr-2 ${className} ` +
                    (selected ? " border-orange" : "")
                }
                color="none"
            >
                {children}
            </Button>
        );
    };

    const BLOCK_TYPES = [
        { label: "H1", style: "header-one" },
        { label: "H2", style: "header-two" },
        { label: "H3", style: "header-three" },
        { label: "H4", style: "header-four" },
        { label: "H5", style: "header-five" },
        { label: "H6", style: "header-six" },
        { label: "Blockquote", style: "blockquote" },
        { label: "UL", style: "unordered-list-item" },
        { label: "OL", style: "ordered-list-item" },
    ];

    const INLINE_STYLES = [
        { label: "B", style: "BOLD" },
        { label: "I", style: "ITALIC" },
        { label: "U", style: "UNDERLINE" },
    ];

    const selection = editorState.getSelection();
    const inlineStyle = editorState.getCurrentInlineStyle();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="mb-4">
            <nav className="p-2 border-2 rounded-md hover:shadow-sm flex flex-wrap">
                {INLINE_STYLES.map((type) => (
                    <EditorButton
                        key={type.style}
                        selected={inlineStyle.contains(type.style)}
                        onSelect={() =>
                            setEditorState(
                                RichUtils.toggleInlineStyle(
                                    editorState,
                                    type.style
                                )
                            )
                        }
                    >
                        {type.label}
                    </EditorButton>
                ))}
                <div className="border-r-2 border-b-gray-500 h-8 mr-2"></div>
                {BLOCK_TYPES.map((type) => (
                    <EditorButton
                        key={type.style}
                        selected={blockType == type.style}
                        onSelect={() =>
                            setEditorState(
                                RichUtils.toggleBlockType(
                                    editorState,
                                    type.style
                                )
                            )
                        }
                        className="font-sans"
                    >
                        {type.label}
                    </EditorButton>
                ))}
            </nav>
            <div
                onClick={() => editor.current?.focus()}
                className={
                    "mt-2 border-2 rounded-md p-2 " +
                    (focused ? "border-orange" : "")
                }
            >
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    spellCheck={true}
                    stripPastedStyles={true}
                    handleKeyCommand={handleKeyCommand}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    keyBindingFn={mapKeyToEditorCommand}
                    blockStyleFn={getBlockStyle}
                    placeholder="Enter the information for this content block here..."
                    ref={editor}
                    {...props}
                />
            </div>
        </div>
    );
};

export default ContentBlockEditor;

export const ContentBlockDisplay: React.FC<{
    state: EditorState;
} & Partial<EditorProps>> = ({ state }) => 
    <div className="text-gray-700">
        <Editor
            editorState={state}
            blockStyleFn={getBlockStyle}
            onChange={() => {}}
            readOnly={true}
            spellCheck={false}
        />
    </div>