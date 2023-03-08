import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AdminLabelPreview } from "../cmps/AdminLabelPreview";

export function AdminLabelList({labels}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [labelToEdit, setLabelToEdit] = useState(null);

  function onEditLabel(label) {
    setLabelToEdit(label);
    label ? navigate(`edit/${label._id}`) : navigate(`add`)
  }

  if(labels) return (
    <section className="admin-label-list">
      <ul>
        {labels.map((label) => (
          <AdminLabelPreview
            label={label}
            onEditLabel={onEditLabel}
            key={`admin-${label._id}`}
          />
        ))}
      </ul>
    </section>
  );
}
