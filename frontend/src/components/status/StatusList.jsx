import StatusItem from "./StatusItem";

const StatusList = ({ statuses }) => {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">Recent updates</p>

      {statuses.length === 0 && (
        <p className="text-gray-500 text-sm">No status updates</p>
      )}

      {statuses.map((status) => (
        <StatusItem key={status._id} status={status} />
      ))}
    </div>
  );
};

export default StatusList;
