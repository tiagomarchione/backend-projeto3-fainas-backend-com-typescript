import { type } from "os";
import type { ToDoItem } from "../types";
import { getColorByValue } from "../constants/categories";
import { UserItem } from "./UserItem";

const texts = {
  loadNextButton: "Próxima",
  loadPreviousButton: "Anterior",
};

export type TodoListProps = {
    todoList: ToDoItem[];
    getTodo: (id?: number) => Promise<void> | void;
    loadNext?: boolean;
    loadPrevious?: boolean;
    onLoadNext?: () => Promise<void>;
    onLoadPrevious?: () => Promise<void>;
    page?: number;
    pageCount?: number;
    count?: number;
};

export function TodoList({ todoList, getTodo, loadNext = false, loadPrevious = false, onLoadNext, onLoadPrevious, page, pageCount, count }: TodoListProps) {
    return (
        <section>  
          <div className="p-6">
            <ul className="flex flex-wrap gap-6 justify-evenly">
              {todoList?.map((ToDoItem) => {
                return (
                  <li
                    key={ToDoItem.id} 
                    className="bg-slate-200 flex-wrap shadow-md rounded-xl p-3 lg:w-[45%] w-11/12 cursor-pointer hover:bg-slate-300 md:max-w-screen-sm md:flex-col"
                    onClick={() => {
                      getTodo(ToDoItem.id);
                    }}
                  >
                    <div className="flex flex-col">
                      {ToDoItem.user !== undefined && typeof ToDoItem.user !== 'number' && <UserItem user={ ToDoItem.user } />}
                      <p className="font-bold text-2xl border-b-2 border-b-slate-300">{ ToDoItem.title }</p>
                      <div className="flex justify-between p-2">
                        <p className="flex font-semibold self-end items-center gap-1"><span style={{backgroundColor: getColorByValue(ToDoItem.category)}} className="flex border h-3 w-3 rounded-full"></span>{ ToDoItem.category }</p>
                        <time dateTime={ToDoItem.deadline} className="font-semibold self-end text-red-600">
                          Prazo: {new Date(ToDoItem.deadline).toLocaleDateString()}
                          </time>
                      </div>
                    </div>
                    <p>{ ToDoItem.description }</p>
                  </li>
                )
              })} 
            </ul>
            <div className="flex gap-4 justify-center p-4">
              <button disabled={!loadPrevious} onClick={onLoadPrevious} className="bg-blue-600 text-white text-md py-2 px-4 font-bold rounded-md w-1/4 hover:bg-blue-700 disabled:b-blue-300">{texts.loadPreviousButton}</button>
              <div className="flex px-2">
                {page !== undefined && pageCount !== undefined && page > 0 && pageCount > 0 && todoList?.length > 0 && (
                  <div className="flex flex-col text-center">
                    <span className="text-sm text-slate-600">Página {page} de {pageCount}</span>
                    <span className="text-sm text-slate-600">{count && `(Total de ${count} Fainas)`}</span>
                  </div>
                )}
              </div>
              <button disabled={!loadNext} onClick={onLoadNext} className="bg-blue-600 text-white text-md py-2 px-4 font-bold rounded-md w-1/4 hover:bg-blue-700 disabled:bg-blue-300">{texts.loadNextButton}</button>
            </div>
          </div>
        </section>
    )
}