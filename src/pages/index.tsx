import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  //these 3 objects are what useQuery standardly returns from a query
  const { data, error, isLoading } = trpc.useQuery(["hello"]);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  return <h1 className="">{JSON.stringify(data)}</h1>;
};

export default Home;
