const fs = require('fs').promises;
import path from 'path';

const projectsDirectory = path.join(process.cwd(), "data/Projects");

export async function getProjectData(){
    var results = await getSections(projectsDirectory, false);
    
    return results;
}

async function getSections(dir, projectFlag){
    const results = await fs.readdir(dir, {withFileTypes: true});
    var data = await Promise.all(results.map(async (result) => {
        const response = path.resolve(dir, result.name);
        if(result.isDirectory()){
            if(!projectFlag){
                return {
                    group: path.basename(result.name, path.extname(result.name)),
                    order: (await getDataChild(response)).order,
                    projects: await getSections(response, true)
                }
            }else{ 
                var data = await getDataChild(response);
                data.title = path.basename(result.name, path.extname(result.name));
                if(data.source){
                    const location = path.resolve(response, data.source);
                    data.source = path.relative(projectsDirectory, location).replace(/\\/g, '/');
                }
                return data;
            } 
        }else{
            return null;
        }
    }));
    data = data.filter((element) => {
        if(element == null) return false;
        return true;
    }).sort((a,b) => {return a.order - b.order;});
    return data;
}

async function getDataChild(dir){
    const data = await JSON.parse(await fs.readFile(path.resolve(dir,"data.json"), 'utf8'));
    return data;
}