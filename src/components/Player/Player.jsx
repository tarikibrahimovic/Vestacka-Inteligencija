import DraggableSVG from "react-draggable-svg";

export default function Player({karakter, height, width, size, playerX, playerY, klasa, setDragingCilj}){
    return(<DraggableSVG.g
        onDragStart={() => setDragingCilj(false)}
      >
        <image
          className={klasa}
          style={{
            transform: `translate(${(playerX * width * size) / width}px, ${
              (playerY * height * size) / height
            }px)`,
          }}
          href={karakter}
          cx={(width * size) / width / 2}
          cy={(height * size) / height / 2}
        />
      </DraggableSVG.g>)
}