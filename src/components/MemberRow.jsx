import { useState } from "react";
import { CheckCircle, Loader2, Trash2 } from "lucide-react";

export default function MemberRow({
  member,
  verifyMember,
  unverifyMember,
  removeMember,
}) {
  const [isVerifying, setIsVerifying] = useState(false);
  const onVerifyToggle = async (id, state) => {
    setIsVerifying(true);
    try {
      state ? await verifyMember(id) : await unverifyMember(id);
    } finally {
      setIsVerifying(false);
    }
  };
  return (
    <tr
      key={member._id}
      className="border-t hover:bg-gray-50 transition-colors"
    >
      <td className="py-3 px-4">{member.username}</td>
      <td className="py-3 px-4">{member.cni}</td>
      <td className="py-3 px-4">{member.email}</td>
      <td className="py-3 px-4">{member.phone}</td>
      <td className="py-3 px-4">
        <button
          onClick={() => onVerifyToggle(member._id, !member.verified)}
          className={`w-full px-3 py-1 text-sm rounded-lg font-medium transition flex items-center justify-center gap-1 ${member.verified ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700" : "bg-black text-white hover:bg-black/75"} cursor-pointer`}
        >
          {isVerifying ? (
            <Loader2 className="animate-spin" size={24} />
          ) : member.verified ? (
            <>
              <CheckCircle size={18} />
              Unverify
            </>
          ) : (
            <>
              <CheckCircle size={18} />
              Verify
            </>
          )}
        </button>
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
  );
}
