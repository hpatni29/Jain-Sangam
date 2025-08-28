const GuruCard = ({ guru }) => (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{guru.name}</h3>
      {guru.youtube && (
        <iframe
          className="w-full h-48 mt-2 rounded-lg"
          src={guru.youtube}
          title={guru.name}
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
  
  export default GuruCard;
  