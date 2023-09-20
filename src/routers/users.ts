import express, { Request, Response, Router } from 'express';
import { UsersService } from '../services/users-service';
import { buildErrorMessage } from '../utilities/message-builder';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const usersService: UsersService = new UsersService();
        const isExtended: boolean = Boolean(Number(req.query.extended));
        const result = await usersService.getAll({ isExtended });        
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(buildErrorMessage((err as any).toString()));
    }
});


router.post('/:id/hobbies', async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {hobbie} : {hobbie: string}= req.body;
        const usersService: UsersService = new UsersService();
        const result = await usersService.addHobbie(Number(id), hobbie)
        res.status(200).json(result);
    }
    catch (err) {
        res.status(400).json(buildErrorMessage((err as any).toString()));
    }
});




router.post('/', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        console.log(user);
        const usersService: UsersService = new UsersService();
        const result = await usersService.create(user);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json(buildErrorMessage((err as any).toString()));
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const usersService: UsersService = new UsersService();
        console.log(id);
        const result = await usersService.deleteById(Number(id));
        res.status(204).json(result);
    }
    catch (err) {
        res.status(400).json(buildErrorMessage((err as any).toString()));
    }
});


export default router;