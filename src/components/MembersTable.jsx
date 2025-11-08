import { CheckCircle, Trash2 } from "lucide-react";

export default function MembersTable({ members, verifyMember, removeMember }) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-md mt-4">
      <table className="min-w-full border-collapse text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="py-3 px-4">Username</th>
            <th className="py-3 px-4">CNI</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Phone</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((member) => (
              <tr
                key={member._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{member.username}</td>
                <td className="py-3 px-4">{member.cni}</td>
                <td className="py-3 px-4">{member.email}</td>
                <td className="py-3 px-4">{member.phone}</td>
                <td className="py-3 px-4">
                  {member.verified ? (
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                      <CheckCircle size={18} /> Verified
                    </div>
                  ) : (
                    <button
                      onClick={() => verifyMember(member._id)}
                      className="w-full px-3 py-1 text-sm rounded-lg bg-black text-white hover:bg-black/75 transition cursor-pointer"
                    >
                      Verify
                    </button>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => removeMember(member._id)}
                    className="text-red-500 hover:text-red-700 transition cursor-pointer"
                    title="Remove Member"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
