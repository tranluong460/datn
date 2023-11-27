import { Drawer } from "antd";

type TwoDrawnDescriptionProps = {
  dataDescription: string;
  openDrawnDescription: boolean;
  isClosedDrawnDescription: () => void;
};

const TwoDrawnDescription = ({
  dataDescription,
  openDrawnDescription,
  isClosedDrawnDescription,
}: TwoDrawnDescriptionProps) => {
  return (
    <Drawer
      title="Mô tả khách sạn"
      placement="right"
      size="default"
      open={openDrawnDescription}
      closable={false}
      onClose={isClosedDrawnDescription}
    >
      <p className="text-justify">{dataDescription}</p>
    </Drawer>
  );
};

export default TwoDrawnDescription;
