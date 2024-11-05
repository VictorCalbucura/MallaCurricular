import { Table, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import subjectsD from "../mocks/subjects.json";

function TableR() {
  const [selected, setSelected] = useState(null);
  const [highlightedPrev, setHighlightedPrev] = useState([]);
  const [highlightedNext, setHighlightedNext] = useState([]);

  const groupSubject = subjectsD.subjects.reduce((acc, subject) => {
    acc[subject.semester] = acc[subject.semester] || [];
    acc[subject.semester].push(subject);
    return acc;
  }, {});

  const maxSubjectsPerSemester = Math.max(
    ...Object.values(groupSubject).map((subjects) => subjects.length)
  );

  const handleSelect = (name) => {
    if (name === selected) {
      setSelected(null);
      setHighlightedPrev([]);
      setHighlightedNext([]);
    } else {
      const selectedSubject = subjectsD.subjects.find((subject) => subject.name === name);
      setSelected(name);
      setHighlightedPrev(selectedSubject.prev);
      setHighlightedNext(selectedSubject.next);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'q') {
      setSelected(null);
      setHighlightedPrev([]);
      setHighlightedNext([]);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const rows = Object.keys(groupSubject).map((semester) => (
    <Table.Tr key={semester}>
      <Table.Td style={{ backgroundColor: '#007BFF', color: '#fff', textAlign: 'center' }}>
        <strong>{`Semestre ${semester}`}</strong>
      </Table.Td>
      {groupSubject[semester].map((subject, index) => {
        const isSelected = selected === subject.name;
        const isPrev = highlightedPrev.includes(subject.name);
        const isNext = highlightedNext.includes(subject.name);

        let backgroundColor = 'white';
        if (isSelected) {
          backgroundColor = 'yellow';
        } else if (isPrev) {
          backgroundColor = 'red';
        } else if (isNext) {
          backgroundColor = 'green';
        }

        return (
          <Table.Td key={index} style={{ textAlign: 'center', borderBottom: 'none' }}>
            <Button
              variant="outline"
              fullWidth
              onClick={() => handleSelect(subject.name)}
              style={{
                backgroundColor,
                color: isSelected || isPrev || isNext ? 'white' : 'black',
                transition: 'background-color 0.4s, border-color 0.4s',
                borderColor: 'transparent',
                borderWidth: '1px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'black';
                e.currentTarget.style.borderWidth = '3px';
                if (!isSelected && !isPrev && !isNext) e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.borderWidth = '1px';
                if (!isSelected && !isPrev && !isNext) e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              {subject.name}
            </Button>
          </Table.Td>
        );
      })}
      {Array.from({ length: maxSubjectsPerSemester - groupSubject[semester].length }).map((_, index) => (
        <Table.Td key={`empty-${index}`} />
      ))}
    </Table.Tr>
  ));

  return (
    <div>
      <Table>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default TableR;
