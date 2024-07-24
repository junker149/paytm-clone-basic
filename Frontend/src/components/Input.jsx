export function Input({label, placeholder, onChange}){
    return <div>
        <div className="font-semibold mb-1">
            {label}
        </div>
        <div>
            <input placeholder={placeholder} onChange={onChange} className="border border-slate-200 w-full rounded-sm p-1 mb-2 active:border-blue-500"></input>
        </div>
    </div>
}