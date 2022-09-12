import { useState } from "react";
import "./App.scss";

import {
  Button,
  Col,
  Input,
  Row,
  Select,
  InputNumber,
  Divider,
  SideSheet,
  Modal,
} from "@douyinfe/semi-ui";
import { TitleConfig } from "./TitleConfig";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { IconMenu } from "@douyinfe/semi-icons";
import ColorList from "./ColorList";

const calcWidth = (width: number, height: number) => {
  return (width / height) * 300;
};

const changImageBgColor = (state: any, color: any) => {
  return {
    ...state,
    bgColor: color,
  };
};

function App() {
  const [titleColorPickerConfig, setTitleColorPickerConfig] = useState({
    showTitleColorPicker: false,
    showSubTitleColorPicker: false,
  });
  const [visible, setVisible] = useState(true);
  const change = () => {
    setVisible(!visible);
  };

  const [coverInfo, setCoverInfo] = useState({
    bgColor: ColorList.defaultColorList[0],
    realHeight: 725,
    realWidth: 1000,
    titleJustifyContent: "center",
    titleAlignItems: "center",
    title: {
      text: "主标题",
      style: {
        color: "#fff",
        backgroundColor: "transparent",
        fontSize: 60,
      },
    },
    subTitle: {
      text: "次标题",
      style: {
        color: "#fff",
        backgroundColor: "transparent",
        fontSize: 48,
      },
    },
  });


  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="App">
      <IconMenu onClick={change} className={"icon-menu-trigger"} />

      <SideSheet
        className="left-container"
        width={800}
        placement={"right"}
        title="配置"
        visible={visible}
        mask={false}
        onCancel={change}
        keepDOM={true}
        closable={false}
      >
        <div className="config">
          <div className="config-item">
            <label className="config-label">宽度&高度</label>
            <div>
              <Row type="flex">
                <InputNumber
                  min={10}
                  defaultValue={coverInfo.realWidth}
                  addonBefore="宽度"
                  onChange={(value) => {
                    setCoverInfo({
                      ...coverInfo,
                      realWidth: value as number,
                    });
                  }}
                />

                <Divider
                  layout="vertical"
                  margin="1rem"
                  style={{ height: "auto" }}
                />

                <InputNumber
                  min={10}
                  defaultValue={coverInfo.realHeight}
                  addonBefore="高度"
                  onChange={(value) => {
                    setCoverInfo({
                      ...coverInfo,
                      realHeight: value as number,
                    });
                  }}
                />
              </Row>
            </div>
          </div>

          <div className="config-item">
            <label className="config-label">背景颜色</label>
            <div>
              <Row type="flex">
                <Input defaultValue={ColorList.defaultColorList[activeIndex]} onChange={val =>{
                  setCoverInfo(
                    changImageBgColor(
                      coverInfo,
                      val
                    )
                  );
                }} />
              </Row>

              <Row type="flex">
                <Button
                  theme="solid"
                  type="primary"
                  style={{ marginRight: 8 }}
                  onClick={() => {
                    Modal.success({
                      icon: null,
                      title: "选择背景颜色",
                      mask: false,
                      content: (
                        <ColorList
                          activeIndex={activeIndex}
                          changImageBgColor={(obj: any) => {
                            setActiveIndex(obj.index);
                            setCoverInfo(
                              changImageBgColor(coverInfo, obj.color)
                            );
                          }}
                        />
                      ),
                      height: "540px",
                      width: "70%",
                    });
                  }}
                >
                  选择颜色
                </Button>
                <Button
                  theme="solid"
                  type="primary"
                  style={{ marginRight: 8 }}
                  onClick={() => {
                    let index = Math.round(
                      Math.random() * ColorList.defaultColorList.length
                    );
                    setActiveIndex(index);
                    setCoverInfo(
                      changImageBgColor(
                        coverInfo,
                        ColorList.defaultColorList[index]
                      )
                    );
                  }}
                >
                  随机颜色
                </Button>
              </Row>
            </div>
          </div>

          <TitleConfig
            label={"主要标题"}
            showColorPicker={titleColorPickerConfig.showTitleColorPicker}
            setShowColorPicker={(val: boolean) => {
              setTitleColorPickerConfig({
                ...titleColorPickerConfig,
                showTitleColorPicker: val,
              });
            }}
            {...coverInfo.title}
            handleColor={(c: any) => {
              var newState = JSON.parse(JSON.stringify(coverInfo));
              newState.title.style.color = c.hex;
              setCoverInfo(newState);
            }}
            handleFontSize={(size: string) => {
              var newState = JSON.parse(JSON.stringify(coverInfo));
              newState.title.style.fontSize = size;
              setCoverInfo(newState);
            }}
            handleText={(txt: string) => {
              var newState = JSON.parse(JSON.stringify(coverInfo));
              newState.title.text = txt;
              setCoverInfo(newState);
            }}
          />
          <TitleConfig
            label={"次要标题"}
            showColorPicker={titleColorPickerConfig.showSubTitleColorPicker}
            setShowColorPicker={(val: boolean) => {
              setTitleColorPickerConfig({
                ...titleColorPickerConfig,
                showSubTitleColorPicker: val,
              });
            }}
            {...coverInfo.subTitle}
            handleColor={(c: any) => {
              var newState = JSON.parse(JSON.stringify(coverInfo));
              newState.subTitle.style.color = c.hex;
              setCoverInfo(newState);
            }}
            handleFontSize={(size: string) => {
              var newState = JSON.parse(JSON.stringify(coverInfo));
              newState.subTitle.style.fontSize = size;
              setCoverInfo(newState);
            }}
            handleText={(txt: string) => {
              var newState = JSON.parse(JSON.stringify(coverInfo));
              newState.subTitle.text = txt;
              setCoverInfo(newState);
            }}
          />

          <div className="config-item">
            <label className="config-label">文字对齐</label>
            <div
              style={{
                flexGrow: 1,
              }}
            >
              <Row type="flex">
                <Col span={12}>
                  <span className="label-span">垂直</span>
                  <Select
                    defaultValue="center"
                    style={{ width: 120 }}
                    onChange={(value) => {
                      setCoverInfo({
                        ...coverInfo,
                        titleJustifyContent: value as string,
                      });
                    }}
                  >
                    <Select.Option value="flex-start">上</Select.Option>
                    <Select.Option value="center">中</Select.Option>
                    <Select.Option value="flex-end">下</Select.Option>
                  </Select>
                </Col>

                <Col span={12}>
                  <span className="label-span">水平</span>
                  <Select
                    defaultValue="center"
                    style={{ width: 120 }}
                    onChange={(value) => {
                      setCoverInfo({
                        ...coverInfo,
                        titleAlignItems: value as string,
                      });
                    }}
                  >
                    <Select.Option value="flex-start">左</Select.Option>
                    <Select.Option value="center">中</Select.Option>
                    <Select.Option value="flex-end">右</Select.Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div className="config-footer">
          <Button
            theme="solid"
            type="primary"
            onClick={() => {
              var dom = document.querySelector("#img")! as HTMLElement;
              // const canvasEle = document.createElement("canvas");
              // canvasEle.style.width = coverInfo.realWidth + "px";
              // canvasEle.style.height = coverInfo.realHeight + "px";
              // canvasEle.width = coverInfo.realWidth;
              // canvasEle.height = coverInfo.realHeight;

              html2canvas(dom, {
                // width: calcWidth(coverInfo.realWidth, coverInfo.realHeight),
                // canvas: canvasEle,
              }).then((canvas) => {
                console.log(
                  "coverInfo.realWidth",
                  coverInfo.realWidth,
                  coverInfo.realHeight
                );
                //const scaleNum = coverInfo.realHeight / 300;
                // const context = canvas.getContext("2d");
                // context?.drawImage(
                //   canvas,
                //   0,
                //   0,
                //   calcWidth(coverInfo.realWidth, coverInfo.realHeight),
                //   300,
                //   0,
                //   0,
                //   coverInfo.realWidth,
                //   coverInfo.realHeight
                // );

                // if(context != null){
                //   canvas.getContext("2d")?.scale(scaleNum, scaleNum)
                // }

                canvas.toBlob((blob) => {
                  saveAs(
                    blob!,
                    `cover-${coverInfo.realWidth}_${
                      coverInfo.realHeight
                    }-${Date.now()}.png`
                  );
                });
              });
            }}
          >
            下载图片
          </Button>
        </div>
      </SideSheet>

      <div className="right-container">
        <div className="img-preview-container">
          <div
            id="img"
            className="img-preview"
            style={{
              // width: calcWidth(coverInfo.realWidth, coverInfo.realHeight) + "px",
              width: coverInfo.realWidth + "px",
              height: coverInfo.realHeight + "px",
              background: coverInfo.bgColor,
            }}
          >
            <div
              className="title-wrapper"
              style={{
                justifyContent: coverInfo.titleJustifyContent,
                alignItems: coverInfo.titleAlignItems,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="title-container">
                <h1 className="title" style={coverInfo.title.style}>
                  {coverInfo.title.text}
                </h1>
                <h2 className="subTitle" style={coverInfo.subTitle.style}>
                  {coverInfo.subTitle.text}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
