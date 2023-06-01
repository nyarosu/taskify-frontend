import { useRouter } from "next/router"
import { SlideFade, Text } from "@chakra-ui/react";
import LoggedInLayout from "@/components/LoggedInLayout";
import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { ProjectDetailsHeader } from "@/components/ProjectDetailsHeader";
import { getProjectInfo } from "@/utils/queries";

const ProjectPage = () => {
    const router = useRouter();
    const { projectid } = router.query;

    // Fetch detailed project info
    const {
        isLoading: isLoadingAll,
        isError: isErrorAll,
        data: allProjects,
      } = useQuery(['getProjectInfo', Number(projectid)], () => getProjectInfo(Number(projectid)))

    return (
        <>
        <Head>
            <title>Taskify | Project Details</title>
            </Head>
            <SlideFade in={true}>
                <ProjectDetailsHeader projectName="abc" />
            </SlideFade>
        </>
    )

}

ProjectPage.getLayout = function getLayout(page: ReactElement) {
    return <LoggedInLayout>{page}</LoggedInLayout>;
  };

export default ProjectPage;