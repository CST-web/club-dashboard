import { X } from "lucide-react";

export default function GalleryModal({ setShowGalleryModal, newGallery, setNewGallery, setGalleries }) {
  const handleGalleryChange = (e) => {
    const { name, value } = e.target;
    setNewGallery(prev => ({ ...prev, [name]: value }));
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://club-server-25gd.onrender.com/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newGallery),
      });
      if (!res.ok) throw new Error("Failed to create gallery");
      const data = await res.json();
      setGalleries(prev => [...prev, data]);
      setShowGalleryModal(false);
      setNewGallery({
        activity: "Échecs",
        title: "",
        date: "",
        images: [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-2xl p-8 w-full max-w-md relative">
        <button
          onClick={() => setShowGalleryModal(false)}
          className="absolute top-3 right-3 text-gray-700 hover:text-black"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-6 border-b border-black pb-2">Create New Gallery</h2>
        <form onSubmit={handleAddGallery} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Activity</label>
            <select
              name="activity"
              value={newGallery.activity}
              onChange={handleGalleryChange}
              className="w-full border border-black rounded-md p-2"
            >
              <option>Échecs</option>
              <option>Robotique</option>
              <option>Prix du meilleur TIPE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold">Title</label>
            <input
              name="title"
              value={newGallery.title}
              onChange={handleGalleryChange}
              required
              className="w-full border border-black rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={newGallery.date}
              onChange={handleGalleryChange}
              required
              className="w-full border border-black rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-all"
          >
            Create Gallery
          </button>
        </form>
      </div>
    </div>
  );
}
