import ActivityCard from "./ActivityCard";

function ActivityList({ activities, handleUpdateActivity, handleDeleteActivity }) {
  return (
    <ul className="cards">
      {activities.map((activity) => {
        return <ActivityCard key={activity.id} activity={activity} handleUpdateActivity={handleUpdateActivity} handleDeleteActivity={handleDeleteActivity} />;
      })}
    </ul>
  );
}

export default ActivityList;