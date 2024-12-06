import React, { Suspense } from "react";
import "./App.css";
import {
  CommunicationUserIdentifier,
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

import { isValidTeamsAppId, isValidToken, isValidUserId } from "./utils";
import { CommunicationIdentityClient } from "@azure/communication-identity";

const CallingWidgetComponent = React.lazy(() => import("./components/CallingWidgetComponent"));

registerIcons({
  icons: { dismiss: <Dismiss20Regular />, callAdd: <CallAdd20Regular /> },
});
initializeIcons();

async function getTokenAndUserId() {
  const connectionString = "endpoint=https://rs-servcom-msteamsvoice.unitedstates.communication.azure.com/;accesskey=Dn9jJwIqSGfNAz6PZqTtQEUiZWMzfgcDDOAZeVJ9sA2Vt1PY7Q7bJQQJ99ALACULyCp8QgizAAAAAZCSbhVK";
  const client = new CommunicationIdentityClient(connectionString);

  const user = await client.createUser();
  const tokenResponse = await client.getToken(user, ["voip"]);

  return {
    token: tokenResponse.token,
    userId: user,
  };
}

function App() {
  const [token, setToken] = React.useState("");
  const [userId, setUserId] = React.useState<CommunicationUserIdentifier | null>(null);

  React.useEffect(() => {
    async function fetchTokenAndUserId() {
      const { token, userId } = await getTokenAndUserId();
      setToken(token);
      setUserId(userId);
    }
    fetchTokenAndUserId();
  }, []);

  const teamsAppIdentifier: MicrosoftTeamsAppIdentifier = {
    teamsAppId: "005d8e01-bfce-4e6b-a690-dd575984e325",
    cloud: "public",
  };

  if (!token || !userId || !isValidToken(token) || !isValidUserId(userId) || !isValidTeamsAppId(teamsAppIdentifier)) {
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

  const widgetParams = {
    userId,
    token,
    teamsAppIdentifier,
  };

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
            Bem-vindo a um exemplo de Calling Widget
          </Text>
          <img
            style={{ width: "7rem", height: "auto" }}
            src={logo}
            alt="logo"
          />
        </Stack>

        <Text>
          Bem-vindo a um exemplo de widget de chamada para o Azure Communication
          Biblioteca de UI de serviços. Este exemplo tem a capacidade de conectar você através de um aplicativos de voz do Teams para ajudá-lo.
        </Text>
        <Text>
          Como usuário, tudo que você precisa fazer é clicar no widget abaixo, inserir seu
          nome de exibição da chamada - funcionará como seu identificador de chamada e
          acione o botão <b>iniciar chamada</b>.
        </Text>
      </Stack>
      <Stack
        horizontal
        tokens={{ childrenGap: "1.5rem" }}
        style={{ overflow: "hidden", margin: "auto" }}
      >
        <Suspense fallback={<Spinner label="Carregando widget..." />}>
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
        </Suspense>
      </Stack>
    </Stack>
  );
}

export default App;