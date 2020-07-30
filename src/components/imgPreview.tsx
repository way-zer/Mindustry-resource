import { Modal } from 'antd';
import React, { useState } from 'react';

export function ImgPreview(props: { src: string }) {
  const [fullImg, setFullImg] = useState(false);
  return (
    <>
      <Modal
        footer={null}
        title={null}
        visible={fullImg}
        onCancel={() => {
          setFullImg(false);
        }}
      >
        <img src={props.src} alt={'Preview'} width={'100%'} />
      </Modal>
      <div
        style={{ width: '100%', height: '0', paddingBottom: '100%' }}
        onClick={() => {
          setFullImg(true);
        }}
      >
        <img
          src={props.src}
          alt={'Preview'}
          style={{
            objectFit: 'contain',
            width: '96%',
            height: '96%',
            position: 'absolute',
            left: '2%',
            top: '2%',
          }}
        />
      </div>
    </>
  );
}
