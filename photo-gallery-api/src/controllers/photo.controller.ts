import {Request, Response, json} from 'express';
import Photo from '../models/Photo';
import path from 'path';
import fs from 'fs-extra';


export async function create(req:Request, res: Response): Promise<Response>{
    console.log('Saving photo');
    const {title, description} = req.body;
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file.path
    }
    const photo = new Photo(newPhoto);
    await photo.save();
    return res.json({
        message: 'Photo successfully saved',
        photo
    });
}

export async function getPhotos(req: Request, res: Response): Promise<Response>{
    const photos = await Photo.find();
    return res.json(photos);
}

export async function getPhoto(req: Request, res:Response): Promise<Response>{
    const photo = await Photo.findById(req.params.id);
    return res.json(photo);
}

export async function deletePhoto(req: Request, res: Response): Promise<Response>{
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if(photo){
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({message:"Photo "+req.params.id+" was deleted"});
}

export async function updatePhoto(req:Request, res: Response): Promise<Response>{
    const {title, description} = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, {
        title,
        description
    },{new:true});
    return res.json({
        message: 'Successfully updated',
        updatePhoto
    });
}