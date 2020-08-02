import React from "react";
import {Modal} from "antd";
import DetailModal from "@/pages/maps/[id]/detail";
import {IRouteComponentProps} from "umi";

export default function (props: IRouteComponentProps<{ id: string }>) {
  return <DetailModal {...props}>
    <>TODO</>
  </DetailModal>
}
