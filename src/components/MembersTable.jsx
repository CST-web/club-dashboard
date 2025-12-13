import MemberRow from "./MemberRow";

export default function MembersTable({
  members,
  verifyMember,
  unverifyMember,
  removeMember,
}) {
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
              <MemberRow
                key={member._id}
                member={member}
                verifyMember={verifyMember}
                unverifyMember={unverifyMember}
                removeMember={removeMember}
              />
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
