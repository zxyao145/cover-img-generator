import { useState } from "react";
import { Slider, Input, Tooltip, Col, Row } from "@douyinfe/semi-ui";
import { SketchPicker } from "react-color";
import "./TitleConfig.scss";

export function TitleConfig(props: any) {

  return (
    <div className="config-item title-config">
      <label className="config-label">{props.label}</label>
      <div>
        <Row type="flex">
          <Col span={24}>
            <Input
              defaultValue={props.text}
              onChange={(txt) => {
                props.handleText(txt);
              }}
            />
          </Col>
        </Row>

        <Row type="flex">
          <Col
            span={1}
            style={{
              zIndex: 9999,
            }}
          >
            <Tooltip content={props.style.color}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  margin: 0,
                  padding: 0,
                  backgroundColor: props.style.color,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() => {
                  props.setShowColorPicker(!props.showColorPicker);
                }}
              >
                {props.showColorPicker ? (
                  <SketchPicker
                    color={props.style.color}
                    onChange={(c) => {
                      props.handleColor(c);
                    }}
                  />
                ) : null}
              </div>
            </Tooltip>
          </Col>
          <Col span={22}>
            <Slider
              style={{ width: "100%" }}
              defaultValue={parseInt(props.style.fontSize)}
              showBoundary={true}
              onChange={(size) => {
                props.handleFontSize(size + "px");
              }}
              min={16}
              max={72}
            ></Slider>
          </Col>
        </Row>
      </div>
    </div>
  );
}
