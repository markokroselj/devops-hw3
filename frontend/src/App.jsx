import Header from './components/Header'
import VehicleCard from './components/VehicleCard'
import { useEffect, useState } from "react";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`/api/get-vehicles`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        return response.json();
      })
      .then((data) => {
        setVehicles(data);
        console.log(data)
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const deleteAllHandler = async () => {
    if (!confirm('Are you sure you want to remove all the vehicles from the system,\nthis action cannot be undone?')) {
      return;
    }
    try {
      const response = await fetch(`/api/delete-all-vehicles`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.log('Failed to delete vehicles');
      }

      setVehicles([]);
    } catch (error) {
      console.error(error);
      alert('Error deleting vehicles: ' + error.message);
    }
  };

  const deleteVehicle = async (id) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      const response = await fetch(`/api/delete-vehicle/${id}`, { method: 'DELETE' });
      if (!response.ok) console.log('Failed to delete vehicle');


      setVehicles(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting vehicle: ' + err.message);
    }
  };


  const filteredVehicles = vehicles.filter(vehicle => {
    if (filter === "all") return true;
    return vehicle.type.toLowerCase() === filter;
  });

  return (
    <>
      <Header />
      <main>
        <div className='p-3 border-b border-dashed flex gap-4'>
          <div>
            Show <select className='border' value={filter}
              onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All vehicles</option>
              <option value="ship">Starship</option>
              <option value="booster">Super Heavy</option>
            </select>
          </div>
          <button className='bg-red-700 text-white px-4 py-1 rounded' onClick={deleteAllHandler}>Remove all vehicles</button>
        </div>
        <div className='p-2 flex flex-col gap-4'>
          {filteredVehicles.map((vehicle) =>
            <VehicleCard key={vehicle.id} {...vehicle} onDelete={() => deleteVehicle(vehicle.id)} />
          )}
        </div>
      </main>
    </>
  )
}

export default App
