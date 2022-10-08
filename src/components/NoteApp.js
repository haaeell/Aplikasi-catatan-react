import React from "react";
import NoteNav from './Header/NoteNav';
import NoteForm from "./form/NoteForm";
import NoteItemList from "./Content/NoteActive/NoteItemList";
import { getInitialData } from "../utils/index"


class NoteApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: getInitialData(),
        };
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onAddHandler = this.onAddHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
    }

    onDeleteHandler(id) {
        const dataNote = this.state.datas.filter((data) => data.id !== id);
        this.setState({ datas: dataNote });

    }

    onAddHandler({ title, body }) {
        this.setState((prevState) => {
            return {
                datas: [
                    ...prevState.datas,
                    {
                        id: +new Date(),
                        title,
                        createdAt: new Date().toISOString(),
                        body,
                        archived: false,
                    },
                ],
            };
        });
    }
    onArchiveHandler(id) {
        const datas = this.state.datas.map((data) => (data.id === id ? { ...data, archived: !data.archived } : data));
        this.setState({ datas });
    }

    render() {

        const searchDatas = !this.state.searchTitle ? this.state.datas : this.state.datas.filter((data) => data.title.toLowerCase().match(this.state.searchTitle));
        const unactived = searchDatas.filter((data) => {
            return data.archived === false;
        });
        const actived = searchDatas.filter((data) => {
            return data.archived === true;
        });
        return (
            <div>
                <NoteNav />
                <div className="note-app__body">
                    <NoteForm addNotes={this.onAddHandler} />
                    <h2>Catatan</h2>
                    {unactived.length > 0 ? <NoteItemList datas={unactived} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} /> : <h1 className="notes-list__empty-message">Tidak Ada Catatan</h1>}
                    <h2>Arsip</h2>
                    {actived.length > 0 ? <NoteItemList datas={actived} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} /> : <h1 className="notes-list__empty-message">Tidak Ada Catatan</h1>}
                </div>
            </div>
        );
    }
}

export default NoteApp;
