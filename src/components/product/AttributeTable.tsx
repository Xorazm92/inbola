interface AttributeTableProps {
  size?: string[] | null;
  color?: string[] | null;
  ageGroup?: string | null;
}

const AttributeTable = ({ size, color, ageGroup }: AttributeTableProps) => {
  if (!size?.length && !color?.length && !ageGroup) return null;

  const renderRow = (label: string, value: string | string[] | undefined | null) => {
    if (!value || (Array.isArray(value) && !value.length)) return null;

    const text = Array.isArray(value) ? value.join(", ") : value;

    return (
      <tr className="border-t border-muted">
        <th className="py-2 pr-4 text-left text-muted-foreground whitespace-nowrap">
          {label}
        </th>
        <td className="py-2 text-foreground/80">{text}</td>
      </tr>
    );
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-[300px] text-sm">
        <tbody>
          {renderRow("Sizes", size)}
          {renderRow("Colors", color)}
          {renderRow("Age Group", ageGroup)}
        </tbody>
      </table>
    </div>
  );
};

export default AttributeTable;
