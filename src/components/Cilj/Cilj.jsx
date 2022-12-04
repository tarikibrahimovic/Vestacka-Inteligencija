import DraggableSVG from "react-draggable-svg";

export default function Cilj({karakter, height, width, size, ciljX, ciljY, klasa, setDragingCilj, editorMode, hidden}){
    return(<DraggableSVG.g
        onDragStart={() => setDragingCilj(true)}
      >
        <image
            className={`${klasa} ${!editorMode && hidden}`}
            style={{
              transform: `translate(${(ciljX * width * size) / width}px, ${
                (ciljY * height * size) / height
              }px)`,
            }}
            href={karakter}
            cx={(width * size) / width / 2}
            cy={(height * size) / height / 2}
          />
      </DraggableSVG.g>)
}