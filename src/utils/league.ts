const leagueConfigList = [
    {
        name: "RED TEAM",
        textShadow:
            "0px -1px 27.7px rgba(255, 63, 66, 0.54), 0px 2px 0px rgba(255, 97, 97, 0.97), 0px 0px 39.4px #FF0404",
        leader: "0x2f49Be6976324000da4Bd091B0217E217b81A93d",
        color: "#C84444",
    },
    {
        name: "ORANGE TEAM",
        textShadow:
            "0px -1px 27.7px rgba(227, 121, 0, 0.54), 0px 2px 0px rgba(255, 168, 69, 0.97), 0px 0px 39.4px #E37900",
        leader: "0x82152dD7A4a7449DeE6B30F4F7bB93Eb0a362ec7",
        color: "#E37900",
    },
    {
        name: "YELLOW TEAM",
        textShadow:
            "0px -1px 27.7px rgba(194, 156, 0, 0.54), 0px 2px 0px rgba(255, 215, 51, 0.97), 0px 0px 39.4px #C29C00",
        leader: "0x8FB03F7aFa01ee3A42339DcaCEa88F828c1670Af",
        color: "#DEB514",
    },
    {
        name: "GREEN TEAM",
        textShadow:
            "0px -1px 27.7px rgba(123, 167, 53, 0.54), 0px 2px 0px rgba(140, 228, 0, 0.97), 0px 0px 39.4px #7BA735",
        leader: "0x737E8dB0D308eb0B9d0BC843198f0De3672334b4",
        color: "#7BA735",
    },
    {
        name: "CYAN TEAM",
        textShadow:
            "0px -1px 27.7px rgba(53, 143, 132, 0.54), 0px 2px 0px rgba(0, 222, 195, 0.97), 0px 0px 39.4px #358F84",
        leader: "0x40BA69df5c58A1106480b42aFEF78DA08860081c",
        color: "#358F84",
    },
    {
        name: "BLUE TEAM",
        textShadow:
            "0px -1px 27.7px rgba(0, 110, 211, 0.54), 0px 2px 0px rgba(31, 148, 255, 0.97), 0px 0px 39.4px #006ED3",
        leader: "0x79Ecf06eF9240f033e87Eb5bC8d96579970De265",
        color: "#006ED3",
    },
    {
        name: "PURPLE TEAM",
        textShadow:
            "0px -1px 27.7px rgba(114, 50, 143, 0.54), 0px 2px 0px rgba(179, 12, 255, 0.97), 0px 0px 39.4px #72328F",
        leader: "0xE75c943E63b67c2E21340F93DC156aFA80fe11cB",
        color: "#72328F",
    },
    {
        name: "PINK TEAM",
        textShadow:
            "0px -1px 27.7px rgba(214, 81, 161, 0.54), 0px 2px 0px rgba(255, 161, 218, 0.97), 0px 0px 39.4px #D651A1",
        leader: "0x63e96235427dC44bf3D7F3A7212c879ba4B5685D",
        color: "#D651A1",
    },
];

export const leagueAddressList = leagueConfigList.map((item) => item.leader);

export default leagueConfigList;
