const TempleCard = ({ temple }) => (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{temple.name}</h3>
      <p>{temple.location}</p>
      <p>Facilities: {temple.facilities}</p>
    </div>
  );
  
  export default TempleCard;
  