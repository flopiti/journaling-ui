import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/pages";
import { useState, useEffect } from "react";
import styles from '@/styles/Home.module.css'

const DesktopApp = () => {
    const[notes, setNotes] = useState<Note[]>([])
    const {createNote, getNotes, deleteNote } = useNotes();
    const [selectedNote, setSelectedNote] = useState<number | null>(null);

    useEffect(() => {
      getNotes().then((notes) => {
        setNotes(notes)
      })

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
          setSelectedNote(prevSelectedNote => 
            prevSelectedNote !== null && prevSelectedNote > 0
              ? prevSelectedNote - 1 
              : prevSelectedNote === null
                ? notes.length - 1 
                : null);
        } else if (event.key === 'ArrowDown') {
          setSelectedNote(prevSelectedNote => 
            prevSelectedNote !== null && prevSelectedNote < notes.length - 1 
              ? prevSelectedNote + 1 
              : prevSelectedNote === null 
                ? notes.length - 1 
                : null
          );
          
                }
      };
      window.addEventListener('keydown', handleKeyDown);
          return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [notes.length]);

    const [text, setText] = useState('');
  
    const handleSubmit = (event:any) => {
      event.preventDefault();
      createNote({
        text: text,
      }).then((note) => {
        setNotes([...notes, note]);
      });
      setText('');
    };
  
    const handleKeyDown = (event:any)=>{
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit(event);
      }
    }
  
    const autoGrow = (event:any) => {
      event.target.style.height = "auto";
      event.target.style.height = (event.target.scrollHeight)+"px";
  
    }
    function convertUTCDateToLocalDate(date:Date) {
      var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
  
      var offset = date.getTimezoneOffset() / 60;
      var hours = date.getHours();
  
      newDate.setHours(hours - offset);
  
      return newDate;   
  }
    return (
        <div className={styles.desktopApp}>
        {
                notes.map((note, index) => {
                  const isSelected = index === selectedNote;
                  const noteClass = isSelected ? `${styles.note} ${styles.selected}` : styles.note;                
                  const dateNew: Date = convertUTCDateToLocalDate(new Date(note.datetime));
                  let formattedDate = `${dateNew.getFullYear()}-${String(dateNew.getMonth() + 1).padStart(2, '0')}-${String(dateNew.getDate()).padStart(2, '0')} ${String(dateNew.getHours()).padStart(2, '0')}:${String(dateNew.getMinutes()).padStart(2, '0')}:${String(dateNew.getSeconds()).padStart(2, '0')}`;
                return <div key={note.id} className={noteClass}>
                    <span className={styles.date}>
                    {formattedDate}    
                    </span>
                    <span className={styles.text}>{note.text}</span>
                </div>  
                })
            }
            <form onSubmit={handleSubmit} className={styles.form}>
            <textarea onInput={autoGrow} className={styles.input} value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown}
            />
            </form>
        </div>
    );
    };

export default DesktopApp;