export const useTest = () =>{
    const tests = [
        {
            id:0,
            name:"test",
        },
        {
            id:1,
            name:'test2',
        }
    ]

    const getters = {
        getTestById:(id)=>tests.find(v=>v.id==id),
    }
    return {
        tests,
        getters
    }
}