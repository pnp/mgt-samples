import * as React from "react";
import { IMgtDemoProps } from "./IMgtDemoProps";

import {
  Person,
  People,
  Agenda,
  TeamsChannelPicker,
  Planner,
  PeoplePicker
} from "@microsoft/mgt-react";

export default class MgtDemo extends React.Component<
  IMgtDemoProps,
  Record<string, unknown>
> {
  public render(): React.ReactElement<IMgtDemoProps> {
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "0px auto",
          color: "black",
          padding: "15px",
          boxShadow:
            "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)"
        }}
      >
        <Person
          personQuery="me"
          view="twolines"
          personCardInteraction="hover"
          showPresence={true}
        />

        <People />

        <Agenda />

        <PeoplePicker />

        <TeamsChannelPicker />

        <Planner />
      </div>
    );
  }
}
