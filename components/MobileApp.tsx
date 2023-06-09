import { useNotes } from "@/hooks/useNotes";
import { Note } from "@/pages";
import { useState, useEffect } from "react";
import styles from '@/styles/Mobile.module.css'

const MobileApp = () => {

    const[notes, setNotes] = useState<Note[]>([])
    const {createNote, getNotes, deleteNote } = useNotes();

    useEffect(() => {
      getNotes().then((notes) => {
        setNotes(notes)
        console.log(notes)
      })
    }, [])
  
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
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

    return (
        <div className={styles.mobileApp}>
        {
                notes.map((note) => {
                  const dateNew: Date = convertUTCDateToLocalDate(new Date(note.datetime));
                  let formattedDate = `${dateNew.getFullYear()}-${String(dateNew.getMonth() + 1).padStart(2, '0')}-${String(dateNew.getDate()).padStart(2, '0')} ${String(dateNew.getHours()).padStart(2, '0')}:${String(dateNew.getMinutes()).padStart(2, '0')}:${String(dateNew.getSeconds()).padStart(2, '0')}`;

                return <div key={note.id} className={styles.note}>
                    <div className={styles.date}>
                    {formattedDate}    
                    </div>
                    <div className={styles.text}>{note.text}</div>
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

export default MobileApp;