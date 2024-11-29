import useragent from "useragent";

export const parseUserAgent = (userAgentString: string) => {
  const agent = useragent.parse(userAgentString);
  return {
    os: agent.os.toString(),
    deviceType: agent.device.toString(),
    deviceModel: agent.toAgent(),
  };
};
