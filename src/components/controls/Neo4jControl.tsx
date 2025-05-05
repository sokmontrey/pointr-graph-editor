import {neo4jExportService} from "../../services/neo4jExportService.ts";
import PrimaryButton from "../ui/PrimaryButton.tsx";

const Neo4jControl = () => {
    const handleExport = () => {
        neo4jExportService.export();
    };

    return <div className="flex flex-row items-center gap-1">
        <PrimaryButton onClick={handleExport}>
            Export
        </PrimaryButton>
        <p className="text-gray-500 pl-2">
            to <strong>.cypher</strong>
        </p>
    </div>;
};

export default Neo4jControl;