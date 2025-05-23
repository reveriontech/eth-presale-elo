import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logos";
import { useChain, useMoralis } from "react-moralis";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontSize: "14px",
    padding: "0 10px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px",
  },
};

const menuItems = [
  {
		key: "0x1",
		value: "Ethereum",
		icon: <ETHLogo />,
	},
	{
		key: "0x539",
		value: "Local Chain",
		icon: <ETHLogo />,
	},
	{
		key: "0x3",
		value: "Ropsten Testnet",
		icon: <ETHLogo />,
	},
	{
		key: "0x4",
		value: "Rinkeby Testnet",
		icon: <ETHLogo />,
	},
	{
		key: "0x2a",
		value: "Kovan Testnet",
		icon: <ETHLogo />,
	},
	{
		key: "0x5",
		value: "Goerli Testnet",
		icon: <ETHLogo />,
	},
	{
		key: "0x38",
		value: "Binance",
		icon: <BSCLogo />,
	},
	{
		key: "0x61",
		value: "Smart Chain Testnet",
		icon: <BSCLogo />,
	},
	{
		key: "0x89",
		value: "Polygon",
		icon: <PolygonLogo />,
	},
	{
		key: "0x13881",
		value: "Mumbai",
		icon: <PolygonLogo />,
	},
	{
		key: "0xa86a",
		value: "Avalanche",
		icon: <AvaxLogo />,
	},

];

function Chains() {
  const { switchNetwork, chainId, chain } = useChain();
  const [selected, setSelected] = useState({});

  console.log("chain", chain);
	const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
		useMoralis();

	useEffect(() => {
		if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
			enableWeb3();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isWeb3Enabled]);

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
    console.log("current chainId: ", chainId);
  }, [chainId]);

  const handleMenuClick = (e) => {
  	try {
			console.log("switch to: ", e.key);
			switchNetwork(e.key);
		} catch (_error) {
			console.log(_error);
			handleMenuClick(e);
		}
	};

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
          <span style={{ marginLeft: "5px" }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
				<Button
					key={selected?.key}
					icon={selected?.icon}
					style={{ ...styles.button, ...styles.item }}>
					<span style={{ marginLeft: "5px" }}>{selected?.value}</span>
					<DownOutlined />
				</Button>
			</Dropdown>
    </div>
  );
}

export default Chains;
