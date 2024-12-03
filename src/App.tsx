import "./App.css";
import {
  CommunicationIdentifier,
  MicrosoftTeamsAppIdentifier,
} from "@azure/communication-common";
import {
  Spinner,
  Stack,
  initializeIcons,
  registerIcons,
  Text,
} from "@fluentui/react";
import { CallAdd20Regular, Dismiss20Regular } from "@fluentui/react-icons";
import logo from "./logo.svg";

import { CallingWidgetComponent } from "./components/CallingWidgetComponent";
import { isValidTeamsAppId, isValidToken, isValidUserId } from "./utils";

registerIcons({
  icons: { dismiss: <Dismiss20Regular />, callAdd: <CallAdd20Regular /> },
});
initializeIcons();
function App() {
  /**
   * Token for local user.
   */
  const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExRkNCRjhEQzBFRTMzQUY3QkIwQTE3OUUzNjI0RUNBNjk1ODE2NjQiLCJ4NXQiOiJFZnlfamNEdU02OTdzS0Y1NDJKT3ltbFlGbVEiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOjhhOTBlNjY4LTc5Y2UtNDBkNi05YjUwLWQ4OWE0Zjc4MzkwYl8wMDAwMDAyNC0yY2RmLTg4NDQtNTcwYy0xMTNhMGQwMDFlNDMiLCJzY3AiOjE3OTIsImNzaSI6IjE3MzMyMzcyNjkiLCJleHAiOjE3MzMzMjM2NjksInJnbiI6ImFtZXIiLCJhY3NTY29wZSI6ImNoYXQsdm9pcCIsInJlc291cmNlSWQiOiI4YTkwZTY2OC03OWNlLTQwZDYtOWI1MC1kODlhNGY3ODM5MGIiLCJyZXNvdXJjZUxvY2F0aW9uIjoidW5pdGVkc3RhdGVzIiwiaWF0IjoxNzMzMjM3MjY5fQ.gSICXr01XqvguLot-zZSrT-agpAEbVXFimdZQlQsN8rYyAb4dlZdjH4ZennOJPJs-7iDU7X-3vW7Uwx96Ggzu0ucy5DNsLJqtArIIZeAfOgV9MYT2ojimcumfreMliH5S6pFe-oRUJ55oSOdv12lRq5hXk0BNvQKm3Mvd5CFub48ce8KYIZl4xVs60NI_daUKT4a6BU9O_SQtbgGRG6OQsLEQ3pQn8KcFsmL3gitBBICkogzVoLlBzFsWjgw2xsfTbLCGWzn18Rtu86DX05cnXQjyw_sIMk9vTwczU493EYUckNphPWM-a_Ng34fVFepFoPSp9jATNfH7OgXFKzH1A";

  /**
   * User identifier for local user.
   */
  const userId: CommunicationIdentifier = {
    communicationUserId: "8:acs:8a90e668-79ce-40d6-9b50-d89a4f78390b_00000024-2ce5-1f0f-290c-113a0d00e817",
  };

  /**
   * Enter your Teams voice app identifier from the Teams admin center here
   */
  const teamsAppIdentifier: MicrosoftTeamsAppIdentifier = {
    teamsAppId: "005d8e01-bfce-4e6b-a690-dd575984e325",
    cloud: "public",
  };

  const widgetParams = {
    userId,
    token,
    teamsAppIdentifier,
  };

  if (!isValidToken(token) || !isValidUserId(userId) || !isValidTeamsAppId(teamsAppIdentifier)) {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" style={{ height: "40rem", width: "100%" }}>
        <Spinner
          ariaLive="assertive"
          labelPosition="top"
        />
        <Text variant="large">Invalid token, local userId or teamsAppId</Text>
      </Stack>
    );
  }

  return (
    <Stack
      style={{ height: "100%", width: "100%", padding: "3rem" }}
      tokens={{ childrenGap: "1.5rem" }}
    >
      <Stack tokens={{ childrenGap: "1rem" }} style={{ margin: "auto" }}>
        <Stack
          style={{ padding: "3rem" }}
          horizontal
          tokens={{ childrenGap: "2rem" }}
        >
          <Text style={{ marginTop: "auto" }} variant="xLarge">
            Welcome to a Calling Widget sample
          </Text>
          <img
            style={{ width: "7rem", height: "auto" }}
            src={logo}
            alt="logo"
          />
        </Stack>

        <Text>
          Welcome to a Calling Widget sample for the Azure Communication
          Services UI Library. This sample has the ability to connect you through a
          Teams voice apps to an agent to help you.
        </Text>
        <Text>
          As a user all you need to do is click the widget below, enter your
          display name for the call - this will act as your caller id, and
          action the <b>start call</b> button.
        </Text>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: "1.5rem" }}
        style={{ overflow: "hidden", margin: "auto" }}
      >
        <CallingWidgetComponent
          widgetAdapterArgs={widgetParams}
          onRenderLogo={() => {
            return (
              <img
                style={{ height: "4rem", width: "4rem", margin: "auto" }}
                src={logo}
                alt="logo"
              />
            );
          }}
        />
      </Stack>
    </Stack>
  );
}

export default App;
