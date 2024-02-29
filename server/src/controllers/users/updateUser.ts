import { Response } from 'express';
import * as editUserService from '../../services/users/editUser';
import { getUserById } from '../../helpers/getUserById';
import { updateUserSchema } from '../../validationSchemas/updateUserSchema';
import bcrypt from 'bcrypt';
import { sendEMail } from '../../config/nodemail';
import { getUserByEmail } from '../../helpers/getUserByEmail';

export const updateUser = async (req, res: Response) => {
  try {
    const { error } = updateUserSchema.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const userId = +req.user.id;

    const { username, email, password } = req.body;

    const existedEmailInDB = await getUserByEmail({ email });

    if (existedEmailInDB && userId !== existedEmailInDB.id) {
      return res.status(400).json({
        status: 400,
        message: 'That email is already registered',
      });
    }

    const userExists = await getUserById({ id: userId });

    if (!userExists) {
      return res.status(404).json({
        error: 'User not found',
        message: 'We could not find the user with a given email',
      });
    }

    const hasEmailChanged = email !== userExists.email;

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: 400,
        message: 'The current password you provided is not valid!',
      });
    }

    const role = 'Admin';

    if (userExists !== null) {
      if (role === 'Admin') {
        await editUserService.editUser(userId, username, email, userExists);

        try {
          const mailInfo = {
            to: `${email}`,
            subject: 'Email Verification ✔',
            text: `Hello ${username}! There, You have recently
           changed your email.
           Thank you!`,
          };

          if (hasEmailChanged) {
            sendEMail(mailInfo);
          }
        } catch (error) {
          console.log('Error while sending email', error);
        }

        res.status(200).json({
          status: 200,
          error: false,
          message: 'User updated Successfully',
        });
      } else {
        return res.status(403).json({
          error: true,
          message: 'Forbidden: Only Admin users can update the user',
        });
      }
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(401).json({
      error: `${error}`,
      message: 'Cannot update the user',
    });
  }
};
