import { useState, useEffect } from "react";
import GalleryModal from "../components/GalleryModal";
import SelectedGalleryModal from "../components/SelectedGalleryModal";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";

export default function Gallery() {
    const [galleries, setGalleries] = useState([]);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [selectedGallery, setSelectedGallery] = useState(null);
    const [newGallery, setNewGallery] = useState({
        activity: "Échecs",
        title: "",
        date: "",
        images: [],
    });

    // Fetch galleries
    useEffect(() => {
        async function fetchGalleries() {
            try {
                const res = await fetch("https://club-server-25gd.onrender.com/gallery");
                if (!res.ok) throw new Error("Failed to fetch galleries");
                const data = await res.json();
                setGalleries(data);
            } catch (error) {
                console.error("Error fetching galleries:", error);
            }
        }
        fetchGalleries();
    }, []);

    const handleDeleteGallery = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`https://club-server-25gd.onrender.com/gallery/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setGalleries(prev => prev.filter(g => g._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="py-8 relative">
            {/* Add Gallery Button */}
            <button
                onClick={() => setShowGalleryModal(true)}
                className="fixed bottom-10 right-10 bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition-all flex items-center gap-2"
            >
                <Plus size={20} /> Add Gallery
            </button>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleries.map((gallery, i) => (
                    <div
                        key={i}
                        className="border border-black rounded-2xl p-4 flex flex-col cursor-pointer hover:shadow-md transition-all bg-white"
                        onClick={() => setSelectedGallery(gallery)}
                    >
                        <div className="relative mb-2">
                            {gallery.thumbnail ? (
                                <img
                                    src={`https://club-server-25gd.onrender.com/uploads/${gallery.thumbnail}`}
                                    alt={gallery.title}
                                    className="w-full h-40 object-cover rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
                                    <ImageIcon size={32} />
                                </div>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteGallery(gallery._id);
                                }}
                                className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white rounded-full p-1"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                        <h2 className="font-semibold text-lg">{gallery.title}</h2>
                        <p className="text-sm text-gray-600">{gallery.activity}</p>
                        <p className="text-sm text-gray-600">
                            {new Date(gallery.date).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {showGalleryModal && (
                <GalleryModal
                    setShowGalleryModal={setShowGalleryModal}
                    newGallery={newGallery}
                    setNewGallery={setNewGallery}
                    setGalleries={setGalleries}
                />
            )}
            {selectedGallery && (
                <SelectedGalleryModal
                    selectedGallery={selectedGallery}
                    setSelectedGallery={setSelectedGallery}
                    setGalleries={setGalleries}
                />
            )}
        </div>
    );
}
