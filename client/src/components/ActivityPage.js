
import { useEffect, useState } from "react";
import NewActivityForm from "./NewActivityForm";
import ActivityList from "./ActivityList";
import Search from "./Search";

function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // no need to use http://localhost:5555 here
    fetch("/fitness-activities")
      .then((r) => r.json())
      .then((ActivitiesArray) => {
        setActivities(ActivitiesArray);
      });
  }, []);

  const handleAddActivity = (newActivity) => {
    const updatedActivitiesArray = [...activities, newActivity];
    setActivities(updatedActivitiesArray);
  }

  const handleUpdateActivity = (updatedActivity) => {
    const updatedActivitiesArray = activities.map(activity => {
      if (activity.id === updatedActivity.id) return updatedActivity
      else return activity;  
    });
    setActivities(updatedActivitiesArray);
  }

  const handleDeleteActivity = (id) => {
    const updatedActivitiesArray = activities.filter((activity) => activity.id !== id);
    setActivities(updatedActivitiesArray);
  }

  const displayedActivities = activities.filter((activity) => {
    return activity.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main className="activity-page">
      <div className="new-activity-form-container">
        <NewActivityForm onAddActivity={handleAddActivity} />
      </div>
      <div className="activity-content">
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ActivityList activities={displayedActivities} handleUpdateActivity={handleUpdateActivity} handleDeleteActivity={handleDeleteActivity}/>
      </div>
    </main>
  );
}

export default ActivityPage;
