import {neo4jExportService} from "../../services/neo4jExportService.ts";

const Neo4jControl = () => {
    const handleExport = () => {
        neo4jExportService.export();
    };

    return <div>
        <button
            onClick={handleExport}
        >
            Export
        </button>
    </div>;
};

export default Neo4jControl;