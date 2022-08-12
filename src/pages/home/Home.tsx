import Main from "../../components/main/Main";
import PageTitle from "../../components/main/PageTitle";
import CellList from "../../components/main/CellList";
import DocumentControls from "../../components/main/DocumentControls";

const Home = () => {
  return (
    <Main>
      <DocumentControls />
      <PageTitle />
      <CellList />
    </Main>
  );
};

export default Home;
