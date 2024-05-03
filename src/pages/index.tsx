import { FC } from "react";
import { Layout } from "../components/Layout";
import Login from "../components/login";

export const IndexPage: FC = () => {
	return (
		<Layout>
			<Login/>
		</Layout>
	);
};
