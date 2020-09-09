import React from 'react';

export default function SquaredImage({ src }: { src: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '0',
        paddingBottom: '100%',
        position: 'relative',
      }}
    >
      <img
        src={src}
        alt={'map Preview'}
        style={{
          objectFit: 'contain',
          width: '96%',
          height: '96%',
          position: 'absolute',
          left: '2%',
          top: '2%',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
